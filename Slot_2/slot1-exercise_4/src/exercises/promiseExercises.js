console.log("=== Promises Exercise ===");

// Promise function that displays random number larger than 5
export const randomNumberPromise = () => {
    return new Promise((resolve, reject) => {
        const randomNum = Math.floor(Math.random() * 10) + 1;
        console.log(`Generated number: ${randomNum}`);

        if (randomNum > 5) {
            resolve(randomNum);
        } else {
            reject("Error: Number is less than or equal to 5");
        }
    });
};

// Test the promise multiple times with async/await
const testPromiseAsync = async () => {
    console.log("Testing with async/await:");
    for (let i = 0; i < 3; i++) {
        try {
            const result = await randomNumberPromise();
            console.log(`✅ Success: Number ${result} is greater than 5`);
        } catch (error) {
            console.log(`❌ ${error}`);
        }
    }
};

// Test using .then() and .catch()
const testPromiseWithThen = () => {
    console.log("\nTesting with .then()/.catch():");

    for (let i = 0; i < 3; i++) {
        randomNumberPromise()
            .then(number => {
                console.log(`✅ Success with .then(): Number ${number} is greater than 5`);
            })
            .catch(error => {
                console.log(`❌ Caught with .catch(): ${error}`);
            });
    }
};

// Advanced Promise example with chaining
const promiseChainExample = () => {
    console.log("\nPromise chaining example:");

    randomNumberPromise()
        .then(number => {
            console.log(`First promise resolved: ${number}`);
            return number * 2;
        })
        .then(doubled => {
            console.log(`Doubled number: ${doubled}`);
            return doubled + 10;
        })
        .then(final => {
            console.log(`Final result: ${final}`);
        })
        .catch(error => {
            console.log(`Chain error: ${error}`);
        });
};

// Promise.all example
const multiplePromises = async () => {
    console.log("\nTesting Promise.all:");

    try {
        const promises = [
            randomNumberPromise(),
            randomNumberPromise(),
            randomNumberPromise()
        ];

        const results = await Promise.all(promises);
        console.log("All promises resolved:", results);
    } catch (error) {
        console.log("At least one promise rejected:", error);
    }
};

// Run all tests
testPromiseAsync();
testPromiseWithThen();
setTimeout(() => {
    promiseChainExample();
    multiplePromises();
}, 1000);