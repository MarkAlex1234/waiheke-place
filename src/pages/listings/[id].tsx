import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function ListingView() {
    const router = useRouter();
    const user = useUser();

    const listing = api.listings.get.useQuery({
        id: router.query.id as string,
    }, {
        enabled: !!router.query.id
    });

    const listingItem = listing.data;

    if (!listingItem) {
        //TODO Add an item not found page
        return;
    }

    return (
        <>
            <Head>
                <title>Waiheke Place</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col bg-gray-800 gap-12">
                <div className="container mx-auto flex flex-col gap-12">
                    <h1 className="mt-12 pl-4 text-4xl">{listingItem.name}</h1>
                    <div className="container grid grid-cols-3 items-center justify-center gap-4" />
                    <p className="h-15 mb-3 font-normal text-gray-700 dark:text-gray-400">{listingItem.description}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">$ {listingItem.price}</p>
                </div>
                {user.isSignedIn && <>Send Message</>}
            </main>
        </>
    );
}