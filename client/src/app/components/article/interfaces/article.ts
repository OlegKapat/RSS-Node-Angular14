export interface Artticle{
    _id:string
    link: string,
    title: string,
    categories: string[],
    content: string,
    contentSnippet: string,
    creator: string,
    guid: string,
    isoDate: Date,
    pubDate: Date
}

