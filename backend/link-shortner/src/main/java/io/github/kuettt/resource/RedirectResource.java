package io.github.kuettt.resource;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

@Path("/")
public class RedirectResource {

    @GET
    @Path("/{code}")
    public Response redirect(@PathParam("code") String code) { return null; }
}
