package com.leverx.leverxspringdemo.config;

import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.CloudPlatformAccessor;

@Configuration //return bean signatures use for Bean Facrory
public class CloudConfig {
	
	@Bean
	public CloudPlatform platform() {
		return CloudPlatformAccessor.getCloudPlatform();
	}

	@Bean
	public ScpCfCloudPlatform space() {
		return  ScpCfCloudPlatform.getInstanceOrThrow();
	}
	
}
