import { Request, Response } from 'express';
import Item from '../models/Item';
import User from '../models/User';

class ItemController {

    async list(request: Request, response: Response) {

        try {

            const { latitude, longitude } = request.query;
            const { userId } = response.locals
            
            console.log(userId)

            const user = await User.findById(userId)
            
            if(!user) return response.status(401).json({ error: "User not found" });            

            const items = await Item.find({
                // needs: {
                //     $in: parseNeeds
                // },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [
                                longitude,
                                latitude
                            ]
                        },
                        $maxDistance: 10000
                    }
                }
            })

            const materiais = items.filter((item) => (item as any).nature === "MATERIAL")
            const artes = items.filter((item) => (item as any).nature === "ARTE")

            return response.json({
                user,
                materiais,
                artes,
            })

        } catch (error) {
            return response.status(401).json({ error: "Error in get Items" })
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const item = await Item.findById(id)
            return response.json(item)
        } catch (error) {
            return response.json({ error })
        }
    }

    async create(request: Request, response: Response) {
        const { user_id } = response.locals
        const { title, nature, description, price, image, latitude, longitude } = request.body;

        try {

            console.debug({title, nature, description, price, image, latitude, longitude})

            const location = await {
                type: 'Point',
                
                coordinates: [longitude, latitude],
            }

            console.debug({location})

            const item = await Item.create({
                title,
                description,
                price,
                image,
                nature,
                user: user_id,
                location
            })

            console.log({item})

            return response.json(item)

        } catch (error) {
            return response.json({ error })
        }
    }

    async update(request: Request, response: Response) {

        const { id } = request.params;
        const { title, nature, description, price, image } = request.body;

        try {

            // atualiza localização?
            // const location = await {
            //     type: 'Point',
            //     coordinates: [longitude, latitude],
            // }

            const values = {
                title,
                description,
                price,
                image,
                nature,
                // user: user_id,
                // location
            }

            await Item.findByIdAndUpdate(id, values)

            return response.json(values)

        } catch (error) {
            return response.json({ error })
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const item = await Item.findByIdAndDelete(id)
            return response.json(item)
        } catch (error) {
            return response.json({ error })
        }

    }

};

export default ItemController;