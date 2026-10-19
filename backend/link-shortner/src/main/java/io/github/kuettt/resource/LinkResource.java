package io.github.kuettt.resource;

import io.github.kuettt.dto.CreateLinkRequestDto;
import io.github.kuettt.dto.DailyClicksResponseDto;
import io.github.kuettt.dto.LinkResponseDto;
import io.github.kuettt.dto.LinkStatsResponseDto;
import io.github.kuettt.entity.ClickEntity;
import io.github.kuettt.entity.LinkEntity;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Path("/api/links")
public class LinkResource {
    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private static final int CODE_LENGTH = 6;

    private static final SecureRandom RANDOM = new SecureRandom();

    @POST
    @Transactional
    public Response create(@Valid CreateLinkRequestDto request) {
        LinkEntity link = new LinkEntity();

        link.originalUrl = request.originalUrl();
        link.code = generateUniqueCode();
        link.persistAndFlush();

        LinkResponseDto linkDto = new LinkResponseDto(link.id, link.code, link.originalUrl, link.createdAt, 0);

        return Response.status(Response.Status.CREATED).entity(linkDto).build();
    }

    @GET
    public List<LinkResponseDto> list() {
        List<LinkEntity> allLinks = LinkEntity.listAll();

        List<LinkResponseDto> result = new ArrayList<>();

        for (LinkEntity link : allLinks) {
            long total = ClickEntity.count("link", link);
            LinkResponseDto linkDto = new LinkResponseDto(link.id, link.code, link.originalUrl, link.createdAt, total);
            result.add(linkDto);
        }

        return result;
    }

    @GET
    @Path("/{code}/stats")
    public LinkStatsResponseDto stats(@PathParam("code") String code) {
        LinkEntity link = LinkEntity.find("code", code).firstResult();

        if (link == null) {
            throw new NotFoundException();
        }

        long total = ClickEntity.count("link", link);
        List<DailyClicksResponseDto> clicksByDay = ClickEntity.getEntityManager().createQuery(
                "select new io.github.kuettt.dto.DailyClicksResponseDto(cast(c.clickedAt as LocalDate), count(c)) "
                        + "from ClickEntity c "
                        + "where c.link = :link "
                        + "group by cast(c.clickedAt as LocalDate) "
                        + "order by cast(c.clickedAt as LocalDate)",
                DailyClicksResponseDto.class)
                .setParameter("link", link)
                .getResultList();

        return new LinkStatsResponseDto(link.code, link.originalUrl, link.createdAt, total, clicksByDay);
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = LinkEntity.deleteById(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    private boolean codeExists(String code) {
        return LinkEntity.count("code", code) > 0;
    }

    private String generateUniqueCode() {
        while (true) {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < CODE_LENGTH; i++) {
                int index = RANDOM.nextInt(ALPHABET.length());
                sb.append(ALPHABET.charAt(index));
            }
            String code = sb.toString();
            if (!codeExists(code)) {
                return code;
            }
        }
    }
}
