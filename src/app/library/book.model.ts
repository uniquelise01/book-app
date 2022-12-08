export class Book {
    constructor(
        public _id: string,
        public id: string,
        public title: string,
        public author: string,
        public imageUrl: string,
        public link: string,
        public published: string,
        public readlist: boolean,
        public series: Book[]
    ) {}
}