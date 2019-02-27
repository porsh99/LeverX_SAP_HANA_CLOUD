package com.leverx.leverxspringdemo.controller;

import java.util.List;

import com.leverx.leverxspringdemo.service.ProductService;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Product;

@RestController
public class ProductController {

    public ProductService productService = new ProductService();

    @GetMapping(value="/products")
    public List<Product> getAllProducts() throws ODataException {
        return  productService.getProductsOdata("oDataDest");
    }

}
