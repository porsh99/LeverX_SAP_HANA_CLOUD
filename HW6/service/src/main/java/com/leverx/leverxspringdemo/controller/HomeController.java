package com.leverx.leverxspringdemo.controller;

import com.google.gson.JsonElement;
import com.leverx.leverxspringdemo.domain.Destination;
import com.leverx.leverxspringdemo.service.SecurityService;
import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.security.RolesAllowed;
import com.sap.cloud.sdk.cloudplatform.security.AuthTokenFacade;
import com.sap.cloud.sdk.cloudplatform.security.user.ScpCfUser;
import com.sap.cloud.sdk.cloudplatform.security.user.UserAccessor;
import com.sap.cloud.sdk.s4hana.connectivity.exception.AccessDeniedException;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.apache.commons.codec.binary.Base64;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.leverx.leverxspringdemo.service.CloudService;
//import sun.tools.jstat.Token;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {
	
	@Autowired
	private CloudService cloudService;

	@Autowired
	private CloudPlatform platform;

	@Autowired
	private SecurityService securityService;

	@RequestMapping(value="/destinations", method=RequestMethod.GET)
	public String getHomes(Model model) {
		Map<String, JsonElement> names = cloudService.getSpaceName();
		JsonElement jE = names.get("space_name");
		String appName = platform.getApplicationName();
		model.addAttribute("username", UserAccessor.getCurrentUser());
		model.addAttribute("appName", appName);
		model.addAttribute("spaceName", jE);
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);
		return "index";
	}

	@RequestMapping(value="/appname", method=RequestMethod.GET)
	public String getHome(Model model) throws ParseException {

		AuthTokenFacade atf = new AuthTokenFacade();

		String[] split_string = atf.getCurrentToken().get().getJwt().getToken().split("\\.");
		String base64EncodedBody = split_string[1];
		Base64 base64Url = new Base64(true);
		String body = new String(base64Url.decode(base64EncodedBody));
		model.addAttribute("body", body);
		return "index";
	}

	@RequestMapping(value="/failed", method=RequestMethod.GET)
	public String getRoleCheckFailed() {
		return "scope";
	}

	@RequestMapping(value="/scope", method=RequestMethod.GET)
	public String checkScope() throws AccessDeniedException {
		securityService.userHasAuthorization("Display");
		return "scope";
	}

	@RequestMapping(value="/scopeFail", method=RequestMethod.GET)
	public String checkScopeFailed() throws AccessDeniedException {
		securityService.userHasAuthorization("Download");
		return "scope";
	}
}
