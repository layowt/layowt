import { websites as Website } from "@prisma/client";
import { prisma } from "@/utils/prisma";

/**
 * 
 * Function to create a new canvas for a website
 * 
 * @param userId - the owner of the canvas
 * @param website - the website to create the canvas for
 */
export default function createCanvas(userId: string, website: Website){
    if(!userId) throw new Error('No user ID specified');
    if(!website) throw new Error('No website specified');

    const { websiteId } = website;

    // create the new canvas
    const response = prisma.canvas.create({
        data: {
            canvasId: websiteId,
            website: {
                connect: {
                    websiteId,
                },
            },
            canvasUrl: '', /** TODO: FIX */
            createdAt: new Date(),
            updatedAt: new Date(),
            page: {
              create: {
                pageSlug: 'home',
                pageTitle: 'Home',
                pageId: `home-${websiteId}`, /** TODO: FIX */
                createdAt: new Date(),
                updatedAt: new Date(),
                pagePrimaryColor: '#ffffff',
                pageSecondaryColor: '#000000',
              }
            },
            owner: {
                connect: {
                    uid: userId,
                },
            }
        },
    });

    if(!response) throw new Error('Failed to create canvas');

    return 'ok';
}