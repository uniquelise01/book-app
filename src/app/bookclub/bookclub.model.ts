import { Book } from "../library/book.model";

export class Bookclub{
    constructor(
        public id: string,
        public name: string,
        public phone: string,
        public imageUrl: string,
        public favBooks: Book[]
    ) {}
}