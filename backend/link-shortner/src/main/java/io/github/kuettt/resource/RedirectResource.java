package io.github.kuettt.resource;

import io.github.kuettt.entity.ClickEntity;
import io.github.kuettt.entity.LinkEntity;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

import java.net.URI;

@Path("/")
public class RedirectResource {

    @GET
    @Path("/{code}")
    @Transactional
    public Response redirect(@PathParam("code") String code) {
        LinkEntity link = LinkEntity.find("code", code).firstResult();
        if (link == null) {
            throw new NotFoundException();
        }

        ClickEntity click = new ClickEntity();
        click.link = link;
        click.persist();

        return Response.status(Response.Status.FOUND).location(URI.create(link.originalUrl)).build();
    }
}
