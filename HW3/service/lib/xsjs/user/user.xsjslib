var user = function (connection) {

    const USER_TABLE = "testApp3::User";
    const USER_ID = '"testApp3::usid"';

    this.doGet = function (obj) {
        const result = connection.executeQuery('SELECT * FROM "' + USER_TABLE + '"');

        result.forEach(x => traceErr(JSON.stringify(x)));

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doPost = function (oUser) {

        oUser.usid = getNextval(USER_ID);//changed

        const statement = createPreparedInsertStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };

    this.doPut = function (obj) {

      const statement = createPreparedUpdateStatement(USER_TABLE, obj);
      connection.executeUpdate(statement.sql, statement.aValues);

      connection.commit();
      $.response.status = $.net.http.OK;
      $.response.setBody(JSON.stringify(obj));
    };

    this.doDelete = function (usid) {
            const statement = createPreparedDeleteStatement(USER_TABLE, {usid: usid});
            connection.executeUpdate(statement.sql, statement.aValues);

            connection.commit();
            $.response.status = $.net.http.OK;
            $.response.setBody(JSON.stringify({}));
        };

    function createPreparedInsertStatement(sTableName, oValueObject) {

        var oResult = new oResult2();

        oResult.prepareParams(oValueObject);
        oResult.traceParams();
        oResult.sliceParamSpaces(); //WARN: magic numbers
        oResult.sql = `insert into "${sTableName}" (${oResult.sColumnList}) values (${oResult.sValueList})`;

        traceErr("sql to insert: " + oResult.sql);
        return oResult;
    };

    function createPreparedUpdateStatement(sTableName, oValueObject) {

        var oResult = new oResult2();

        oResult.prepareParams(oValueObject);
        oResult.traceParams();
        oResult.sliceParamSpaces(); //WARN: magic numbers
        oResult.sql = `update "${sTableName}" set (${oResult.sColumnList}) = (${oResult.sValueList}) where "${oResult.aParams[0]}" = '${oResult.aValues[0]}'`;

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
