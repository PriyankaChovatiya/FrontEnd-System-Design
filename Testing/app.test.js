const SortingByAge = require("./App");

test("testing if the first person name is priyuu ",() =>{
 const sortedData = SortingByAge();

 expect (sortedData[0].name). toBe("Priyuu");
});

test("testing the data which lenghth 4 ",() =>{
    const sortedData = SortingByAge();
   
    expect(sortedData).toHaveLength(4);
   });