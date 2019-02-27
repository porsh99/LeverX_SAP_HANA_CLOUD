package com.leverx.leverxspringdemo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.JsonElement;
import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.connectivity.DestinationAccessor;
import com.sap.cloud.sdk.cloudplatform.connectivity.GenericDestination;

import com.leverx.leverxspringdemo.domain.Destination;
import com.leverx.leverxspringdemo.domain.Property;

@Service
public class CloudService {
	
	@Autowired
	private CloudPlatform platform;


	@Autowired
	private ScpCfCloudPlatform space;
	
	public String getApplicationName() {
		return platform.getApplicationName();
	}

	public Map<String, JsonElement> getSpaceName(){
		space.getApplicationName();
		return  space.getVcapApplication();
	}


	public List<Destination> getDestinations() {
		List<Destination> destinationList = new ArrayList<Destination>();
		Map<String, GenericDestination> destinationMap = DestinationAccessor.getGenericDestinationsByName();
		destinationMap.forEach((key, value) -> {
			Destination destination = new Destination();
			destination.setName(value.getName());
			destination.setDescription(value.getDescription().orElseGet(() -> {
				return "No description";
			}));
			destination.setDestinationType(value.getDestinationType().toString());
			Map<String, String> propertyMap = value.getPropertiesByName();
			List<Property> propertyList = new ArrayList<Property>();
			propertyMap.forEach((name, data) -> {
				Property property = new Property();
				property.setName(name);
				property.setValue(data);
				propertyList.add(property);
			});
			destination.setPropertyList(propertyList);
			destinationList.add(destination);
		});
		return destinationList;
	}
}
