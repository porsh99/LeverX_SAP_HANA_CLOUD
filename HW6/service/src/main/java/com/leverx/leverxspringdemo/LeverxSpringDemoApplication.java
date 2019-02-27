package com.leverx.leverxspringdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan("com.sap.cloud.sdk")
public class LeverxSpringDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeverxSpringDemoApplication.class, args);
	}

}

