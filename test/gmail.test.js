const Gmail = require('../src/providers/gmail');

test('it should return true for jodevsa@gmail.com', () => {
  return Gmail('jodevsa@gmail.com').then((answer)=>{
    expect(answer).toBeTruthy();
  })
});

test('it should return false for falsefalse001false@gmail.com', () => {
  return Gmail('falsefalse001false@gmail.com').then((answer)=>{
    expect(answer).toBeFalsy();
  })
});
