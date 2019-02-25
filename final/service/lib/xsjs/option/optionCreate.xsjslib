/**
 @param {connection} Connection - The SQL connection used in the OData request
 @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 @param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */

 const OPTIONS_TABLE = "hw3::Options";
 const SEQ_NAME = "hw3::opid";
 const CURR_TIMESTAMP_FUN = "current_timestamp";

function optionCreate(param){
  traceErr(JSON.stringify(param));
  var after = param.afterTableName;

  //Get Input New Record Values
  var	pStmt = param.connection.prepareStatement(`select * from  "${after}"`);
  var oResult = executeQueryCloseStatement(pStmt);

  var oOptionItems = recordSetToJSON(oResult, "items");
  var oOption = oOptionItems.items[0];
  traceErr(JSON.stringify(oOption));

	//Get Next Personnel Number
	pStmt = param.connection.prepareStatement(`select "${SEQ_NAME}".NEXTVAL from dummy`);
	var result = executeQueryCloseStatement(pStmt);
  oOption.opid = getUserIDFromSequenceResult(result);

  traceErr(JSON.stringify(oOption));
	//Insert Record into DB Table and Temp Output Table

  pStmt = param.connection.prepareStatement(`insert into "${OPTIONS_TABLE}" values(?,?,?,?,?,?);`);
  prepareStatementValues(pStmt, oOption);
  executeUpdateCloseStatement(pStmt);

  pStmt = param.connection.prepareStatement(`TRUNCATE TABLE "${after}"`);
  executeUpdateCloseStatement(pStmt);

  pStmt = param.connection.prepareStatement(`insert into "${after}" values(?,?,?,?,?,?);`);
  prepareStatementValues(pStmt, oOption);
  executeUpdateCloseStatement(pStmt);
}
//WARN: hard code 4 column values type of table User: usid, name, ts_update, ts_create
function prepareStatementValues(_stmt, _oOption){
  _stmt.setString(1, _oOption.opid.toString());
  _stmt.setString(2, _oOption.crid.toString());
  _stmt.setString(3, _oOption.name.toString());
  _stmt.setString(4, _oOption.cost.toString());
  _stmt.setTimestamp(5, (new Date()).toISOString());
  _stmt.setTimestamp(6, (new Date()).toISOString());
}

function executeUpdateCloseStatement(_stmt){
  _stmt.executeUpdate();
  _stmt.close();
}

function executeQueryCloseStatement(_stmt){
  var result = _stmt.executeQuery();
  _stmt.close();
  return result;
}

function getUserIDFromSequenceResult(_result){
  var id = "0000";
  while (_result.next())
  {
    id = _result.getString(1);
  }
  return id;
}

function recordSetToJSON(rs,rsName){
    rsName = typeof rsName !== 'undefined' ? rsName : 'entries';

    var meta = rs.getMetaData();
    var colCount = meta.getColumnCount();
    var values=[];
    var table=[];
    var value="";
    while (rs.next()) {
        for (var i=1; i<=colCount; i++) {
            value = '"'+meta.getColumnLabel(i)+'" : ';
            switch(meta.getColumnType(i)) {
                case $.db.types.VARCHAR:
                case $.db.types.CHAR:
                    value += '"'+ escapeSpecialChars(rs.getString(i))+'"';
                    break;
                case $.db.types.NVARCHAR:
                case $.db.types.NCHAR:
                case $.db.types.SHORTTEXT:
                    value += '"'+escapeSpecialChars(rs.getNString(i))+'"';
                    break;
                case $.db.types.TINYINT:
                case $.db.types.SMALLINT:
                case $.db.types.INT:
                case $.db.types.BIGINT:
                    value += rs.getInteger(i);
                    break;
                case $.db.types.DOUBLE:
                    value += rs.getDouble(i);
                    break;
                case $.db.types.DECIMAL:
                    value += rs.getDecimal(i);
                    break;
                case $.db.types.REAL:
                    value += rs.getReal(i);
                    break;
                case $.db.types.NCLOB:
                case $.db.types.TEXT:
                    value += '"'+ escapeSpecialChars(rs.getNClob(i))+'"';
                    break;
                case $.db.types.CLOB:
                    value += '"'+ escapeSpecialChars(rs.getClob(i))+'"';
                    break;
                case $.db.types.BLOB:
                    value += '"'+ $.util.convert.encodeBase64(rs.getBlob(i))+'"';
                    break;
                case $.db.types.DATE:
                    var dateTemp = new Date();
                    dateTemp.setDate(rs.getDate(i));
                    var dateString = dateTemp.toJSON();
                    value += '"'+dateString+'"';
                    break;
                case $.db.types.TIME:
                    var dateTemp = new Date();
                    dateTemp.setDate(rs.getTime(i));
                    var dateString = dateTemp.toJSON();
                    value += '"'+dateString+'"';
                    break;
                case $.db.types.TIMESTAMP:
                    var dateTemp = new Date();
                    dateTemp.setDate(rs.getTimestamp(i));
                    var dateString = dateTemp.toJSON();
                    value += '"'+dateString+'"';
                    break;
                case $.db.types.SECONDDATE:
                    var dateTemp = new Date();
                    dateTemp.setDate(rs.getSeconddate(i));
                    var dateString = dateTemp.toJSON();
                    value += '"'+dateString+'"';
                    break;
                default:
                    value += '"'+escapeSpecialChars(rs.getString(i))+'"';
            }
            values.push(value);
        }
        table.push('{'+values+'}');
    }
    return 	JSON.parse('{"'+ rsName +'" : [' + table	+']}');

}
function escapeSpecialChars(input) {
    if(typeof(input) != 'undefined' && input != null)
    {
        return input
            .replace(/[\\]/g, '\\\\')
            .replace(/[\"]/g, '\\\"')
            .replace(/[\/]/g, '\\/')
            .replace(/[\b]/g, '\\b')
            .replace(/[\f]/g, '\\f')
            .replace(/[\n]/g, '\\n')
            .replace(/[\r]/g, '\\r')
            .replace(/[\t]/g, '\\t'); }
    else
    {
        return "";
    }
}
function escapeSpecialCharsText(input) {
    if(typeof(input) != 'undefined' && input != null)
    {
        input.replace(/[\"]/g, '\"\"');
        if(input.indexOf(",") >= 0 ||
            input.indexOf("\t") >= 0 ||
            input.indexOf(";") >= 0 ||
            input.indexOf("\n") >= 0 ||
            input.indexOf('"') >= 0 )
        {input = '"'+input+'"';}

        return input;
    }
    else
    {
        return "";
    }
}

function optionUpdate(param) {
  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement(`select * from  "${after}"`);
  var oResult = executeQueryCloseStatement(pStmt);

  var oOptionItems = recordSetToJSON(oResult, "items");
  var oOption = oOptionItems.items[0];
  var sql = `UPDATE "${OPTIONS_TABLE}" SET "name"='${oOption.name}', "cost"='${oOption.cost}', "ts_update" = ${CURR_TIMESTAMP_FUN} WHERE "opid"=${oOption.opid};`;

  var uStmt = param.connection.prepareStatement(sql);
  executeUpdateCloseStatement(uStmt);
}


function traceErr(value)
{
  $.trace.error(value);
}
