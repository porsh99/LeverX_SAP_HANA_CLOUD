package com.leverx.leverxspringdemo.service;

import com.leverx.leverxspringdemo.domain.Product;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryBuilder;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ProductService {
    public List<Product> getProductsOdata(String destinationName) throws ODataException {
        ODataQueryResult result = ODataQueryBuilder.withEntity("/V2/OData/OData.svc/","Products").
                select("ID","Name", "Description", "Rating").build().execute(destinationName);
        List<Map<String,Object>> listMap =  result.asListOfMaps();
        return  getProductList(listMap);
    }


    public List<Product>  getProductList (List<Map<String,Object>> listMap) {
        List <Product> productsList = new ArrayList<>();
        listMap.forEach(item->{
            Product prod = new Product();
            prod.setId(Integer.parseInt(item.get("ID").toString()));
            prod.setName(item.get("Name").toString());
            prod.setDescription(item.get("Description").toString());
            prod.setRating(Integer.parseInt(item.get("Rating").toString()));
            productsList.add(prod);
        });
        return productsList;
    }
}
