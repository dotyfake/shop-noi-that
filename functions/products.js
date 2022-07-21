const { Client } = require('@notionhq/client');
const { NOTION_KEY, NOTION_DB } = process.env;

const notion = new Client({
    auth: NOTION_KEY,
});

let results = [];

exports.handler = async () => {
    let myPage = await notion.databases.query({
        database_id: NOTION_DB,
        filter: {
            property: 'Tags',
            select: {
                equals: 'Public',
            },
        },
    });

    results = [...myPage.results];

    while (myPage.has_more) {
        myPage = await notion.databases.query({
            database_id: NOTION_DB,
            filter: {
                property: 'Tags',
                select: {
                    equals: 'Public',
                },
            },
            start_cursor: myPage.next_cursor,
        });
        results = [...results, ...myPage.results];
    }
    return {
        statusCode: 200,
        body: JSON.stringify(results),
    };
};
