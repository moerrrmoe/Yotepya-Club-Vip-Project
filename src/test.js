function fibonacci(n){
    let toAdd = 1
    const sequence = [0]
    while(n>= sequence.length){
        
        sequence.push(toAdd)
        toAdd = sequence[0]+toAdd
    }
    return sequence
}

console.log(fibonacci(2))