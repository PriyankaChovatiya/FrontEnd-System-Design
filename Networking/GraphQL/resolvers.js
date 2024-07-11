
const data = {
    authors : [
        {id:"1", name: "Akshat Gurnani", bookIds : ["101","102"]},
        {id:"2", name: "Priyaa ", bookIds : ["103"]},
    ],
    books: [
        {id:"101", title: "Machine Learning", publishedYear: 2024, authorId: "1"},
        {id:"102", title: "Artificial Intelligence", publishedYear: 2023, authorId: "1"},
        {id:"103", title: "react developer", publishedYear: 2024, authorId: "2"}
    ],
}


export const resolvers = {
    Book: {
        author : (parent, args, context, info) => {
        console.log(parent);
        return data.authors.find(authorDetail => authorDetail.id === parent.authorId);
        },
    },

    Author: {
        books : (parent, args, context, info) => {
        console.log(parent);
        return data.books.filter(book => parent.bookIds.includes(book.id));
        },
    },


    Query : {
        authors: (parent, args, context, info) =>{
            return data.authors;
                       },
        books: (parent, args, context, info) =>{
            return data.books;
                     }
    }

}

Mutation : {
    addBook: (parent, args, context, info) =>
    {
      console.log(args);
      const newBook = {...args, id: data.books.length + 1};
      data.books.push(newBook)
      return newBook;
    }
}