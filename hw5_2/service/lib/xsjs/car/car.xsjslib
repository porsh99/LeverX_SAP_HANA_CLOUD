var car = function (connection) {

    const CARS_TABLE = "hw3::Cars";
    const CAR_ID = '"hw3::crid"';
    const CURR_TIMESTAMP_FUN = "current_timestamp";

    this.doGet = function (obj) {
        const result = connection.executeQuery('SELECT * FROM "' + CARS_TABLE + '"');

        result.forEach(x => traceErr(JSON.stringify(x)));

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doPost = function (oCar) {

        oCar.crid = getNextval(CAR_ID);//changed

        const statement = createPreparedInsertStatement(CARS_TABLE, oCar);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCar));
    };

    this.doPut = function (obj) {

      const statement = createPreparedUpdateStatement(CARS_TABLE, obj);
      connection.executeUpdate(statement.sql, statement.aValues);

      connection.commit();
      $.response.status = $.net.http.OK;
      $.response.setBody(JSON.stringify(obj));
    };

    this.doDelete = function (crid) {
            const statement = createPreparedDeleteStatement(CARS_TABLE, {crid: crid});
            connection.executeUpdate(statement.sql, statement.aValues);

            traceErr("parameter of car to delete" + JSON.stringify(crid));

            connection.commit();
            $.response.status = $.net.http.OK;
            $.response.setBody(JSON.stringify({}));
        };

    function createPreparedInsertStatement(sTableName, oValueObject) {

        var oResult = new oResult2();

        oResult.prepareParams(oValueObject);
        oResult.traceParams();
        oResult.sliceParamSpaces(); //WARN: magic numbers
        oResult.sql = `insert into "${sTableName}" (${oResult.sColumnList},"ts_update","ts_create") values (${oResult.sValueList},${CURR_TIMESTAMP_FUN},${CURR_TIMESTAMP_FUN})`;

        traceErr("sql to insert: " + oResult.sql);
        return oResult;
    };

    function createPreparedUpdateStatement(sTableName, oValueObject) {

        var oResult = new oResult2();

        oResult.prepareParams(oValueObject);
        oResult.traceParams();
        oResult.sliceParamSpaces(); //WARN: magic numbers
        oResult.sql = `update "${sTableName}" set (${oResult.sColumnList}) = (${oResult.sValueList}), "ts_update" = ${CURR_TIMESTAMP_FUN} where "${oResult.aParams[0]}" = '${oResult.aValues[0]}'`;

        traceErr("sql to update: " + oResult.sql);
        return oResult;
    };

    function createPreparedDeleteStatement(sTableName, oConditionObject) {
        let oResult = new oResult2();

        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += `"${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
        }
        // Remove the last unnecessary AND
        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }

        oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;

        traceErr("sql to delete: " + oResult.sql);
        return oResult;
    };

    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    function traceErr(value)
    {
      $.trace.error(value);
    }

    function oResult2()
    {
      this.aParams = [];
      this.aValues = [];
      this.sql = "";
      this.sColumnList = '';
      this.sValueList = '';

      this.prepareParams = function(oValueObject)
      {
        for(let key in oValueObject){
            this.sColumnList += `"${key}",`;
            this.aParams.push(key);
            this.sValueList += "?, ";
            this.aValues.push(oValueObject[key]);
        }
      }

      this.sliceParamSpaces = function()
      {
        this.sColumnList = this.sColumnList.slice(0, -1);
        this.sValueList = this.sValueList.slice(0, -2);
      }

      this.traceParams = function()
      {
          $.trace.error("svalue " + this.sValueList);
          $.trace.error("scolumn: " + this.sColumnList);
      }
    }
};
