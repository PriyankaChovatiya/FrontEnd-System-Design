const users = [
    {
        name : "Priyaa",
        age : 22,
    },
    {
         name: "Akshat",
         age: 24,
    },
    {
        name: "Mastermind",
        age: 25,
    },
    {
        name: "Priyuu",
        age: 10,
    },
];

function SortingByAge(){
    const data = users.sort((a,b) => a.age - b.age);
    return data;
}

console.log(SortingByAge());

module.exports = SortingByAge;