package io.github.kuettt.resource;


import io.github.kuettt.dto.CreateLinkRequestDto;
import io.github.kuettt.dto.LinkResponseDto;
import io.github.kuettt.dto.LinkStatsResponseDto;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/links")
public class LinkResource {

    @POST
    public Response create(CreateLinkRequestDto request){ return null; }

    @GET
    public List<LinkResponseDto> list(){ return null;}

    @GET
    @Path("/{code}/stats")
    public LinkStatsResponseDto stats(@PathParam("code") String code){ return null; }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id){ return null; }
}
