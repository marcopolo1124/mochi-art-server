import { NextFunction, Request, Response } from "express";
import pool from "./pool";
import crypto from "crypto"
import { RequestParams, ResponseBody,
         RequestBody, StatusQuery, IdParams,
         CommissionBody, RequestQuery } from "./interfaces";
import { Pagination } from "../../types/custom";

export async function getCommissionsWithStatus(req: Request<RequestParams, ResponseBody, RequestBody, StatusQuery>, res: Response, next: NextFunction){
    const {status, perPage, orderBy, page} = req.query
    const query = `SELECT * FROM commissions.commissions ${status? "WHERE commission_status=$4": ""} ORDER BY $1 OFFSET $2 LIMIT $3`
    const bindVarBase = [orderBy, perPage * (page - 1), perPage]
    const bindVar = status? [...bindVarBase, status]: bindVarBase
    try{
        const rowCount = pool.query(
            'SELECT COUNT(*) FROM commissions.commissions'
        )
        const commissions = await pool.query(
            query,
            bindVar
        )
        //
        res.send({commissions: commissions.rows, rowCount: (await rowCount).rows[0].count})
    }catch (err){
        next(err)
    }

}

export async function getCommission(req: Request<IdParams, ResponseBody, RequestBody, RequestQuery>, res: Response, next: NextFunction){
    const {id} = req.params
    try{
        const images = pool.query(
            'SELECT * FROM commissions.commission_images WHERE commission_id=$1',
            [id]
        )
    
        const commission = await pool.query(
            'SELECT * FROM commissions.commissions WHERE id=$1',
            [id]
        )
    
        if (commission.rows.length > 0){
            res.send({
                commission: commission.rows[0],
                images: (await images).rows
            })
        } else{
            res.status(404).send({
                commission: null,
                images: []
            })
        }
    }catch (err){
        next(err)
    }

}

export async function postCommission(req: Request<RequestParams, ResponseBody, CommissionBody, RequestQuery>, res: Response, next: NextFunction) {
    const images = req.files as { [references: string]: Express.Multer.File[] };
    try{
        const {name, email, characterName, numberOfCharacters, scope, comType, details} = req.body
        const id = crypto.randomUUID()
        await pool.query(
            "INSERT INTO commissions.commissions (id, name, email, character_name, number_of_characters, scope, com_type, details)\
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [id, name, email, characterName, numberOfCharacters, scope, comType, details]
        )
        // const promises = []
        images.references?.forEach((reference) => {
            pool.query(
                "INSERT INTO commissions.commission_images (commission_id, file_name)\
                 VALUES ($1, $2)",
                [id, reference.filename]
            )
        })
        // await Promise.all(promises)
        res.status(201).send({message: 'commission pending'})
    }catch (err){
        next(err)
    }
}

export async function updateCommissionStatus(req: Request, res: Response, next: NextFunction){
    try{
        const {commission_id, status} = req.body
        if (!commission_id || ! status) {
            const err = new Error ("missing information")
            next(err)
        }
        const updateReq = await pool.query(
            "UPDATE commissions.commissions SET commission_status=$2 WHERE id=$1",
            [commission_id, status]
        )
        res.send({message: "updated"})
    } catch(err){
        next(err)
    }
}
