import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from '../../util/util';
const validUrl = require('valid-url');

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    // Pull image_url out of query string
    let imageUrl: string = req.query.image_url;
    
    // Check that image URL is valid
    if (!imageUrl || !validUrl.isUri(imageUrl)) {
        return res.status(400).send("Bad image URL.");
    }

    // Filter image
    try {
        let filteredImage = await filterImageFromURL(imageUrl);
        if (filteredImage) {
            return res.status(200).sendFile(filteredImage.toString());
        }
        throw Error("No image returned");
    } catch (error) {
        console.log(error);
        return res.status(422).send("Unprocessable Entity.");
    }
});

export const FilteredImageRouter: Router = router;