# Stage 1: build the app with JDK + Maven (discarded at the end)
FROM registry.access.redhat.com/ubi9/openjdk-25:1.24 AS build

USER root
RUN microdnf install -y unzip && microdnf clean all
USER 185

WORKDIR /home/default/build

COPY --chown=185 pom.xml mvnw ./
COPY --chown=185 .mvn/ .mvn/
RUN ./mvnw -B dependency:go-offline

COPY --chown=185 src/ src/
RUN ./mvnw -B package -DskipTests

# Stage 2: runtime image with only the JRE and the built app
FROM registry.access.redhat.com/ubi9/openjdk-25-runtime:1.24 AS runtime

ENV LANGUAGE='en_US:en'

# We make four distinct layers so if there are application changes the library layers can be re-used
COPY --chown=185 --from=build /home/default/build/target/quarkus-app/lib/ /deployments/lib/
COPY --chown=185 --from=build /home/default/build/target/quarkus-app/*.jar /deployments/
COPY --chown=185 --from=build /home/default/build/target/quarkus-app/app/ /deployments/app/
COPY --chown=185 --from=build /home/default/build/target/quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 8080
USER 185
ENV JAVA_OPTS_APPEND="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"

ENTRYPOINT [ "/opt/jboss/container/java/run/run-java.sh" ]
