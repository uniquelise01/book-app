export class Book {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public imageUrl: string,
        public link: string,
        public published: string,
        public readList: boolean,
        public series: Book[]
    ) {}
}