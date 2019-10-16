const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { find, filter } = require('lodash');


const PORT = 3000;

const app = express();

// const Query = gql`
//   type Trainer {
//     name: String
//     age: Int
//     engineers: [Engineer]
//     attendances: [Attendance]
//     programs: [Program]
//   }

//   type Engineer {
//     name: String
//     age: Int
//     attendances: [Attendance]
//     programs: [Program]
//   }

//   type Program {
//     name: String
//     trainer: Trainer
//     enginners: [Engineer]
//   }

//   type Attendance {
//     date: String
//     trainer: Trainer
//     engineer: Engineer
//   }

//   type Status {
//     code: Int
//     message: String
//   }

//   type Query {
//     status: Status
//     trainer: Trainer
//     enginner: Engineer
//     program: Program
//     attendance: Attendance
//     getTrainers: [Trainer]
//     getEngineers: [Engineer]
//     getPrograms: [Program]
//     getAttendances: [Attendance]
//   }
// `;

const trainers = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    engineers: [ 1, 2, 3 ],
    programs: [1],
    attendances: [1, 2]
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 31,
    engineers: [ 3 ],
    programs: [2],
    attendances: [3, 4]
  }
];

const engineers = [
  {
    id: 1,
    name: 'John Doe Engineer',
    age: 30,
    programs: [1],
    attendances: [5, 6]
  },
  {
    id: 2,
    name: 'Jane Doe Engineer',
    age: 31,
    programs: [2],
    attendances: [7, 8]
  },
  {
    id: 3,
    name: 'Jonas Doe Engineer',
    age: 25,
    programs: [2],
    attendances: []
  }
];

const programs = [
  {
    id: 1,
    name: 'DevOps',
    trainers: [1],
    engineers: [1]
  },
  {
    id: 2,
    name: 'SIS100',
    trainers: [2],
    engineers: [2]
  }
];

const attendances = [
  {
    id: 1,
    date: '2019-10-01',
    trainer: 1,
    engineer: null
  },
  {
    id: 2,
    date: '2019-10-02',
    trainer: 1,
    engineer: null
  },
  {
    id: 3,
    date: '2019-10-01',
    trainer: 2,
    engineer: null
  },
  {
    id: 4,
    date: '2019-10-02',
    trainer: 2,
    engineer: null
  },
  {
    id: 5,
    date: '2019-10-01',
    trainer: null,
    engineer: 1
  },
  {
    id: 6,
    date: '2019-10-02',
    trainer: null,
    engineer: 1
  },
  {
    id: 7,
    date: '2019-10-01',
    trainer: null,
    engineer: 2
  },
  {
    id: 8,
    date: '2019-10-02',
    trainer: null,
    engineer: 2
  }
];

// const resolvers = {
//   Query: {
//     status: () => ({ code: 200, msg: "OK" }),
//     trainer: {
//       trainer(parent, args, context, info) {
//         return find(trainers, { id: args.id });
//       }
//     },
//     attendance: () => attendances,
//     getTrainers: () => trainers
//   },
//   Status: {
//     code: (obj) => obj.code,
//     message: (obj) => obj.msg
//   },
//   Trainer: {
//     engineers(trainer) {
//       return filter(engineers, { trainer: trainer.id });
//     }
//   }
// };

const authors = [
  {
    id: 1,
    name: 'some'
  },
  {
    id: 2,
    name: 'other'
  }
]

const books = [
  {
    id: 1,
    title: 'new',
    author: 'some'
  },
  {
    id: 2,
    title: 'old',
    author: 'other'
  }
]

const Query = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    books: [Book]
  }

  type Query {
    author: Author
  }
`;

const typeDefs = [Query];


const resolvers = {
  Query: {
    author(parent, args, context, info) {
      return find(authors, { id: args.id });
    },
  },
  Author: {
    books(author) {
      return filter(books, { author: author.name });
    },
  },
};


// const server = new ApolloServer({ typeDefs, resolvers });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  }
});

server.applyMiddleware({ app });

app.get('/status', (req, res) => res.send('Express status: OK'))

console.log(`Express running on ${PORT}`)
app.listen(PORT)
