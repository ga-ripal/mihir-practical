const express = require('express')
const router = express.Router()
const ROUTES = require('../../constants/routes.constant')
const apiHelper =  require('../../helpers/api.helper')

router.post(`${ROUTES.CREATE_SUDOKU.URL}`, async (req, res) => {
    try {
        const { body } = req;
        const arr = [...body.data];
        const col1 = arr.slice(0, 9);
        const col2 = arr.slice(9, 18);
        const col3 = arr.slice(18, 27);
        const col4 = arr.slice(27, 36);
        const col5 = arr.slice(36, 45);
        const col6 = arr.slice(45, 54);
        const col7 = arr.slice(54, 63);
        const col8 = arr.slice(63, 72);
        const col9 = arr.slice(72, 81);

        var boardArray = [col1, col2, col3, col4, col5, col6, col7, col8, col9];
        sodokoSolver(boardArray);
        const finalResult = flatten(boardArray)
        return apiHelper.success(res, { finalResult }, 'Sudoku Created Successfully !!!');

    } catch (error) {
        return apiHelper.failure(res, [error], 'Error Occured');
    }
});

function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

function sodokoSolver(data) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (data[i][j] == null) {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(data, i, j, k)) {
                        data[i][j] = k;
                        if (sodokoSolver(data)) {
                            return true;
                        } else {
                            data[i][j] = null;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}


module.exports = router;