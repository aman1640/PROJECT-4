function generateMatrixInputs() {
    const order = parseInt(document.getElementById("matrixOrder").value);
    if (isNaN(order) || order < 2) {
        alert("Please enter a valid matrix order.");
        return;
    }

    const matrixContainer = document.getElementById("matrixInputs");
    matrixContainer.innerHTML = ""; // Clear previous inputs

    for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.className = "matrix-cell";
            input.id = `cell-${i}-${j}`;
            matrixContainer.appendChild(input);
        }
    }

    document.getElementById("matrix-section").style.display = "block";
}

function performLDUFactorization() {
    const order = parseInt(document.getElementById("matrixOrder").value);
    const matrix = [];

    for (let i = 0; i < order; i++) {
        const row = [];
        for (let j = 0; j < order; j++) {
            row.push(parseFloat(document.getElementById(`cell-${i}-${j}`).value) || 0);
        }
        matrix.push(row);
    }

    const L = Array.from(Array(order), () => Array(order).fill(0));
    const D = Array.from(Array(order), () => Array(order).fill(0));
    const U = Array.from(Array(order), () => Array(order).fill(0));
    let steps = "";

    for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
            U[i][j] = matrix[i][j];
        }
    }

    for (let i = 0; i < order; i++) {
        if (U[i][i] === 0) {
            let swapped = false;
            for (let k = i + 1; k < order; k++) {
                if (U[k][i] !== 0) {
                    [U[i], U[k]] = [U[k], U[i]];
                    [L[i], L[k]] = [L[k], L[i]];
                    steps += `Row ${i + 1} swapped with Row ${k + 1} to avoid zero pivot.\n`;
                    swapped = true;
                    break;
                }
            }
            if (!swapped) {
                alert("Matrix is singular or nearly singular; cannot proceed with factorization.");
                return;
            }
        }

        L[i][i] = 1;

        for (let j = i + 1; j < order; j++) {
            const factor = U[j][i] / U[i][i];
            L[j][i] = factor;
            steps += `Eliminate U[${j + 1}][${i + 1}] using factor L[${j + 1}][${i + 1}] = ${factor.toFixed(3)}\n`;

            for (let k = i; k < order; k++) {
                U[j][k] -= factor * U[i][k];
            }
        }
    }

    for (let i = 0; i < order; i++) {
        D[i][i] = U[i][i];
        U[i][i] = 1;
    }

    document.getElementById("stepsOutput").textContent = steps;
    document.getElementById("LMatrix").textContent = matrixToString(L);
    document.getElementById("DMatrix").textContent = matrixToString(D);
    document.getElementById("UMatrix").textContent = matrixToString(U);
    document.getElementById("solution-section").style.display = "block";
}

function matrixToString(matrix) {
    return matrix.map(row => row.map(cell => cell.toFixed(3)).join("\t")).join("\n");
}



function generateMatrixInputs() {
    const order = parseInt(document.getElementById("matrixOrder").value);
    if (isNaN(order) || order < 2) {
        alert("Please enter a valid matrix order.");
        return;
    }

    const matrixContainer = document.getElementById("matrixInputs");
    matrixContainer.innerHTML = ""; // Clear previous inputs

    for (let i = 0; i < order; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "matrix-row";

        for (let j = 0; j < order; j++) {
            const cellContainer = document.createElement("div");
            cellContainer.className = "matrix-cell-container";

            // Create label for matrix element (e.g., a11, a12, ...)
            const label = document.createElement("label");
            label.textContent = `a${i + 1}${j + 1}`;
            label.setAttribute("for", `cell-${i}-${j}`);
            cellContainer.appendChild(label);

            // Create input for matrix element
            const input = document.createElement("input");
            input.type = "number";
            input.className = "matrix-cell";
            input.id = `cell-${i}-${j}`;
            input.placeholder = `0`;
            cellContainer.appendChild(input);

            rowDiv.appendChild(cellContainer);
        }
        
        matrixContainer.appendChild(rowDiv);
    }

    document.getElementById("matrix-section").style.display = "block";
}

function generateMatrixInputs() {
    const order = parseInt(document.getElementById("matrixOrder").value);
    if (isNaN(order) || order < 2) {
        alert("Please enter a valid matrix order.");
        return;
    }

    const matrixContainer = document.getElementById("matrixInputs");
    matrixContainer.innerHTML = ""; // Clear previous inputs

    // Set the grid style based on the matrix order
    matrixContainer.style.gridTemplateColumns = `repeat(${order}, auto)`;

    for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
            const cellContainer = document.createElement("div");
            cellContainer.className = "matrix-cell-container";

            // Create label for matrix element (e.g., a11, a12, ...)
            const label = document.createElement("label");
            label.textContent = `a${i + 1}${j + 1}`;
            label.setAttribute("for", `cell-${i}-${j}`);
            cellContainer.appendChild(label);

            // Create input for matrix element
            const input = document.createElement("input");
            input.type = "number";
            input.className = "matrix-cell";
            input.id = `cell-${i}-${j}`;
            input.placeholder = `0`;
            cellContainer.appendChild(input);

            matrixContainer.appendChild(cellContainer);
        }
    }

    document.getElementById("matrix-section").style.display = "block";
}

