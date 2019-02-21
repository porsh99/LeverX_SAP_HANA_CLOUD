--
CREATE PROCEDURE XSAPPUSER_GETPSE (IN InPurpose VARCHAR (24), OUT OutName NVARCHAR (256))
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE ERROR_INVALID_USER CONDITION FOR SQL_ERROR_CODE 10332;
  DECLARE varStatement NVARCHAR (256);
  SELECT COUNT(*) INTO varCounter FROM SYS.PSES WHERE PURPOSE = :InPurpose;
  IF (:varCounter = 0) THEN
    IF (:InPurpose = 'JWT') THEN
      OutName := 'SAPXSUAAJWT';
    ELSEIF (:InPurpose = 'SAML') THEN
      OutName := 'SAPXSUAASAML';
    ELSE
      OutName := 'SAPXSJWT';
    END IF;
    varStatement := 'CREATE PSE ' || :OutName;
    EXEC :varStatement;
    varStatement := 'SET PSE ' || :OutName || ' PURPOSE '  || :InPurpose;
    EXEC :varStatement;
  ELSE
      SELECT NAME INTO OutName FROM SYS.PSES WHERE PURPOSE = :InPurpose;
  END IF;
END;
--
----query for a certificate
CREATE PROCEDURE XSAPPUSER_GETCERT (IN DnName NVARCHAR (5000), OUT CertId BIGINT)
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE ERROR_INVALID_USER CONDITION FOR SQL_ERROR_CODE 10332;
  DECLARE varStatement NVARCHAR (9000);
  SELECT COUNT(*) INTO varCounter FROM SYS.CERTIFICATES WHERE SUBJECT_DISTINGUISHED_NAME = :DnName AND ISSUER_DISTINGUISHED_NAME = :DnName;
  IF (:varCounter = 0) THEN
     CertId := 0;
  ELSE
     SELECT CERTIFICATE_ID INTO CertId FROM SYS.CERTIFICATES WHERE SUBJECT_DISTINGUISHED_NAME = :DnName AND ISSUER_DISTINGUISHED_NAME = :DnName;
  END IF;
END;
--
---- create certificate is not working since dynmic sql allows only 1024 chars... but the certificate most times is larger
CREATE PROCEDURE XSAPPUSER_CREATECERT (IN DnName NVARCHAR (256), IN CertBlob NCLOB, OUT CertId BIGINT)
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE ERROR_INVALID_USER CONDITION FOR SQL_ERROR_CODE 10332;
  DECLARE varStatement NVARCHAR (9000);
  SELECT COUNT(*) INTO varCounter FROM SYS.CERTIFICATES WHERE SUBJECT_DISTINGUISHED_NAME = :DnName AND ISSUER_DISTINGUISHED_NAME = :DnName;
  IF (:varCounter = 0) THEN
--     varStatement := 'CREATE CERTIFICATE FROM ' || :CertBlob || ';
     varStatement := 'CREATE CERTIFICATE FROM ' || :CertBlob;
     EXEC :varStatement;
--      CREATE CERTIFICATE FROM :CertBlob;
  END IF;
  SELECT CERTIFICATE_ID INTO CertId FROM SYS.CERTIFICATES WHERE SUBJECT_DISTINGUISHED_NAME = :DnName AND ISSUER_DISTINGUISHED_NAME = :DnName;
END;
--
---- drop the PSE store trust
CREATE PROCEDURE XSAPPUSER_DELETE_TRUST (IN PseName NVARCHAR (256), IN CertId BIGINT)
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE varStatement NVARCHAR (256);
  SELECT COUNT(*) INTO varCounter FROM SYS.PSE_CERTIFICATES WHERE CERTIFICATE_ID = :CertId;
  IF (:varCounter > 0) THEN
     varStatement := 'ALTER PSE ' || :PseName || ' DROP CERTIFICATE ' || :CertId;
     EXEC :varStatement;
  END IF;
END;
--
CREATE PROCEDURE XSAPPUSER_ADD_TRUST (IN PseName NVARCHAR (256), IN CertId BIGINT)
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE varStatement NVARCHAR (256);
  varStatement := 'ALTER PSE ' || :PseName || ' ADD CERTIFICATE ' || :CertId;
  EXEC :varStatement;
END;
--
---- create JWT provider if possible
CREATE PROCEDURE XSAPPUSER_CREATE_PROVIDER ()
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE ERROR_INVALID_USER CONDITION FOR SQL_ERROR_CODE 10332;
  DECLARE varStatement NVARCHAR (1000);
  SELECT COUNT(SYS.VIEWS.VIEW_NAME) INTO varCounter FROM SYS.VIEWS WHERE VIEW_NAME = 'JWT_PROVIDERS';
  IF (:varCounter = 0) THEN
     varStatement := '';
  ELSE
     varStatement := 'CREATE JWT PROVIDER JWTPROVIDER_52EE5DB0_B5F8_47C9_BCDA_F401A84CF821 WITH ISSUER ''http://p2001081098trial.localhost:8080/uaa/oauth/token'' CLAIM ''user_name'' AS EXTERNAL IDENTITY';
     EXEC :varStatement;
  END IF;
END;
--
---- create JWT provider if possible
CREATE PROCEDURE XSAPPUSER_ALTER_PROVIDER ()
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE ERROR_INVALID_USER CONDITION FOR SQL_ERROR_CODE 10332;
  DECLARE varStatement NVARCHAR (1000);
  SELECT COUNT(SYS.VIEWS.VIEW_NAME) INTO varCounter FROM SYS.VIEWS WHERE VIEW_NAME = 'JWT_PROVIDERS';
  IF (:varCounter = 0) THEN
     varStatement := '';
  ELSE
     varStatement := 'ALTER JWT PROVIDER JWTPROVIDER_52EE5DB0_B5F8_47C9_BCDA_F401A84CF821 SET ISSUER ''http://p2001081098trial.localhost:8080/uaa/oauth/token'' CLAIM ''user_name'' AS EXTERNAL IDENTITY';
     EXEC :varStatement;
  END IF;
END;
--
---- convenience call: add a certificate to a PSE store with certain purpose
CREATE PROCEDURE XSAPPUSER_CREATE (IN InPurpose VARCHAR (24), IN DnName NVARCHAR (5000))
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE ERROR_INVALID_USER CONDITION FOR SQL_ERROR_CODE 10332;
  DECLARE certId BIGINT;
  DECLARE pseName NVARCHAR (256);
  CALL XSAPPUSER_GETPSE(:InPurpose , :pseName);
  CALL XSAPPUSER_GETCERT(:DnName, :certId);
  IF (:certId = 0) THEN
     CALL XSAPPUSER_CREATECERT(:DnName, :pseName, :certId);
  ELSE
     CALL XSAPPUSER_DELETE_TRUST(:pseName, :certId);
  END IF;
  CALL XSAPPUSER_ADD_TRUST(:pseName, :certId);
END;
--
---- convenience call: remove a certificate from a PSE store and finally drop certificate
CREATE PROCEDURE XSAPPUSER_DROP (IN InPurpose VARCHAR (24), IN DnName NVARCHAR (5000))
LANGUAGE SQLSCRIPT SQL SECURITY INVOKER AS
varCounter INTEGER := 0;
BEGIN
  DECLARE ERROR_INVALID_USER CONDITION FOR SQL_ERROR_CODE 10332;
  DECLARE certId BIGINT;
  DECLARE pseName NVARCHAR (256);
  DECLARE varStatement NVARCHAR (256);
  CALL XSAPPUSER_GETPSE(:InPurpose , :pseName);
  CALL XSAPPUSER_GETCERT(:DnName, :certId);
  IF (:certId > 0) THEN
     CALL XSAPPUSER_DELETE_TRUST(:pseName, :certId);
     varStatement := 'DROP CERTIFICATE ' || :CertId;
     EXEC :varStatement;
  END IF;
END;
--
---- now use stored procedures and recreate trust
CALL XSAPPUSER_DROP('JWT', 'OU=JWT, CN=aws-live-eu10');
--
CREATE CERTIFICATE FROM '-----BEGIN CERTIFICATE-----MIIE3jCCAsagAwIBAgIGElXjqKNAMA0GCSqGSIb3DQEBCwUAMCYxFjAUBgNVBAMMDWF3cy1saXZlLWV1MTAxDDAKBgNVBAsMA0pXVDAgFw0xNjAxMDEwMDAwMDBaGA8yMDUwMDEwMTAwMDAwMFowJjEWMBQGA1UEAwwNYXdzLWxpdmUtZXUxMDEMMAoGA1UECwwDSldUMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwThn6OO9kj0bchkOGkqYBnV1dQ3zU/xtj7Kj7nDd8nyRMcEWCtVzrzjzhiisRhlrzlRIEY82wRAZNGKMnw7cvCwNixcfcDJnjzgr2pJ+5/yDZUc0IXXyIWPZD+XdL+0EogC3d4+fqyvg/BF/F0t2hKHWr/UTXE6zrGhBKaL0d8rKfYd6olGWigFd+3+24CKI14zWVxUBtC+P9Fhngc9DRzkXqhxOK/EKn0HzSgotf5duq6Tmk9DCNM4sLW4+ERc6xzrgbeEexakabvax/Az9WZ4qhwgw+fwIhKIC7WLwCEJaRsW4m7NKkv+eJR2LKYesuQ9SVAJ3EXV86RwdnH4uAv7lQHsKURPVAQBlranSqyQu0EXs2N9OlWTxe+FyNkIvyZvoLrZl/CdlYc8AKxRm5rn2/88nkrYQ0XZSrnICM5FRWgVF2hn5KfZGwtBN85/D4Yck6B3ocMfyX7e4URUm9lRPQFUJGTXaZnEIge0R159HUwhTN1HvyXrs6uT1ZZmW+c3p47dw1+LmUf/hIf8zd+uvHQjIeHEJqxjqfyA8yqAFKRHKVFrwnwdMHIsRap2EKBhHMfeVf0P2th5C9MggYoGCvdIaIUgMBX3TtCdvGrcWML7hnyS2zkrlA8SoKJnRcRF2KxWKs355FhpHpzqyZflO5l98+O8wOsFjGpL9d0ECAwEAAaMQMA4wDAYDVR0TAQH/BAIwADANBgkqhkiG9w0BAQsFAAOCAgEAuuvGVcq5boD4PPSUl0uQ+3Tzp5t0+zi4vV4s9kRSJan1TJTbVaL4QvBdmcOCWBRCi/n2Q3FkbJT2UQILurLmyk0upCxqIvIv0qfpBtqlNtwHrn9WyMVnIqhDiHBjFKgjtl+n6MqWYrZjDm5wOUXGmBcSLI/UTAEU23Cphg2P2KfOY+mWZAr/w5781dRMruiQgAyxZnCu5i/P/5VKdQqWg+fkToFCIMjg5eFa6hEjvvgnzhYdQY3LFBaergHGBhAoTJp7nNP5LjJLdXXVBYCEKmAbKN4kG0OEy8oQnK6yJgblwFMpsQBvi9e7mj7SBHLLkr5FRigE0DdoIreUbrnrG1m6+C4mXZs5Duo2uzQkoM3jt0ST3PRiXE79vB5CVJWCHNBuFBtjOET1BpWXZOOvKYlLNbVm4c2u3ynM8Oe5kKCZmPvSG08J8PAWeDdlBir1OCAJr4T3EmkwhFVjMGwmshWnzm3AtkxWNsuRm9OeK+48YFFKcNBP98M/+Yw/kUfQnWzfI7aGzCvAG7/B15PwXMpFSSUi4QVRzA9hrSD4CqTpe0wfa7yXm7l0sT8MJtCilraw9LxWtvC4mbVa7ufDaLqUt7G2g1TaoYtTO8mdS0HF2ye88U1cysm3QsaCA2ub5tyLmjgsrJO9kDbiTICDOx7QjttejnBYCO00CBc4598=-----END CERTIFICATE-----';
--
CALL XSAPPUSER_CREATE('JWT', 'OU=JWT, CN=aws-live-eu10');
--
CALL XSAPPUSER_CREATE_PROVIDER();
--
CALL XSAPPUSER_ALTER_PROVIDER();
--
---- remove stored procedures to cleanup
DROP PROCEDURE XSAPPUSER_CREATE;
--
DROP PROCEDURE XSAPPUSER_GETPSE;
--
DROP PROCEDURE XSAPPUSER_GETCERT;
--
DROP PROCEDURE XSAPPUSER_CREATECERT;
--
DROP PROCEDURE XSAPPUSER_DELETE_TRUST;
--
DROP PROCEDURE XSAPPUSER_ADD_TRUST;
--
DROP PROCEDURE XSAPPUSER_CREATE_PROVIDER;
--
DROP PROCEDURE XSAPPUSER_ALTER_PROVIDER;
--
DROP PROCEDURE XSAPPUSER_DROP;
--
---- ready with update now show all relevant entries
SELECT * FROM SYS.PSES;
--
SELECT * FROM SYS.CERTIFICATES;
--
SELECT * FROM SYS.PSE_CERTIFICATES;
--
---- this sql only works on HANA 2 SP1 or higher
---- SELECT * FROM SYS.JWT_PROVIDERS;
--