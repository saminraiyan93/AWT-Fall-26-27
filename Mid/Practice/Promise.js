function getStudentResult() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const success = true;

            if (success) {

                resolve(
                    {
                        ID: "101",
                        Name: "Rahim",
                        Department: "CSE",
                        Marks: "85",
                    }

                );

            }
            else {
                reject(
                    console.log("Result Processing Failed!!")
                );
            }
        }, 3000)

    });
}

async function displayResult() {
    console.log("Getting student result...");
    try {
        const result = await getStudentResult();
        if (result != null) {
            console.log("Student result received!");
            console.log("ID: ", result.ID);
            console.log("Name: ", result.Name);
            console.log("Department: ", result.Department);
            console.log("Marks: ", result.Marks);
            console.log("Result Processing Completed!");
        }

    }
    catch (error) {
        console.log("Error", error);
    }
}

displayResult();