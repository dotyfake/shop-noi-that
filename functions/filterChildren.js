const { Client } = require('@notionhq/client');
const { NOTION_KEY, NOTION_DB } = process.env;

const notion = new Client({ auth: NOTION_KEY });

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const response = await notion.databases.query({
        database_id: NOTION_DB,
        filter: {
            and: [
                {
                    property: 'Tags',
                    select: {
                        equals: 'Public',
                    },
                },
                {
                    property: 'Loai',
                    select: {
                        equals: `${data.childrenKey}`,
                    },
                },
            ],
        },
    });
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
