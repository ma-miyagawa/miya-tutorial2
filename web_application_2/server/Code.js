import doGet from './functions/doGet'
import sample from './functions/sample'
import getBooksTable from './functions/getBooksTable'
import getBooksTableById from './functions/getBooksTableById'
import updateBooksTable from './functions/updBooksTable'
import deleteBooksTable from './functions/deleteBooksTable'
import dbOperation from './functions/dbOperation'
import dbAccessInfo from './functions/dbAccessInfo'

global.doGet = doGet
global.sample = sample
global.getBooksTable = getBooksTable
global.getBooksTableById = getBooksTableById
global.updateBooksTable = updateBooksTable
global.deleteBooksTable = deleteBooksTable
global.dbOperation = dbOperation
global.dbAccessInfo = dbAccessInfo
