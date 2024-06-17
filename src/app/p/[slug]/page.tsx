import React from "react";

export default function Pages({ params, searchParams }: { params: { slug: string }, searchParams: any }) {
    const { search_name } = searchParams;
    const { slug } = params;

    const pageStructure = {
        "meta": {
            title: "Home",
            description: "This is the home page",
        },
    };

    return (
        <div>content</div>
    )
}