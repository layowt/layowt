'use server';
import { Website } from "@prisma/client";
import { prisma } from "@/utils/prisma";

interface CreateWebsiteProps {
	userId: string;
	website: Website;
	generateCanvas: boolean;
}

/**
 * 
 * Function to create a new canvas for a website
 * 
 * @param userId - the owner of the canvas
 * @param website - the website to create the canvas for
 */
export default async function createCanvas({
    userId,
    website,
    generateCanvas,
}: CreateWebsiteProps){
    if(!userId) throw new Error('No user ID specified');
    if(!website) throw new Error('No website specified');

    const { websiteId } = website;

    // create the new canvas
    const response = await prisma.canvas.create({
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
            }
        },
    });
    if(!response) throw new Error('Failed to create canvas');
    // if we do not need to generate the canvas in the site builder, 
    // we can exit early
    if(!generateCanvas) return 'ok'

    // if we need to generate the canvas in the site builder, we can do so here
    // by calling the site builder API

    return 'ok';
}