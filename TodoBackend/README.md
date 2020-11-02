# Spring Boot With JWT

## Spring Boot 

Hello Everyone, I will try to explain as much as possible. \
I like to use **Eclipse**  that cause all my configurations depends  to eclipse environment. \

I want to start basic but important  stuff like Entities, so let's start have a enjoy. \

### User.java
```
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	@Column(name = "first_name")
	private String firstname;
	@Column(name = "last_name")
	private String lastname;
	@Column(name = "email")
	private String email;
	@Column(name = "username")
	private String username;
	@Column(name = "password")
	private String password;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User(String firstname, String lastname, String username, String email, String password) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public User() {
	}

	public Long getId() {
		return id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
```
Important things about User Entity(Model)  we should set user role with **@ManyToMany** anotation.\
This anotation provide us  join  Role table for this  project but mainly works for joining table.\
Why we have Role table ? If anyone want to  developt this project like admin panel or manager panel\ it will be easy to controll.

### Role.java

```
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class Role  {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole name;

	public Role(ERole name) {
		this.name = name;
	}

	public Role() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}
}
```

Our role Entity(Model) simply have ***Enum.java***  simply  this enum store our user types and \
makes simple to control user types.

### Enum.java

```
public enum ERole {
	ROLE_USER,
    ROLE_MODERATOR,
    ROLE_ADMIN
}
```

### Todo.java

```
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "todos")
public class Todo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "username")
	private String username;
	@Column(name = "description")
	private String description;
	@Column(name = "target_date")
	private LocalDate createdDate;
	@Column(name = "updated_date")
	private LocalDate updatedDate;
	@Column(name = "is_done")
	private Boolean isDone;

	// Constructor with Parameters
	public Todo(String username, String description, LocalDate createdDate, LocalDate updatedDate, Boolean isDone) {
		super();
		this.username = username;
		this.description = description;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
		this.isDone = isDone;
	}

	// Constructor without Parameters
	public Todo() {
	}
	// Getters and Setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDate getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(LocalDate updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Boolean getIsDone() {
		return isDone;
	}

	public void setIsDone(Boolean isDone) {
		this.isDone = isDone;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Todo other = (Todo) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
```

This is clasical entities which have  as know in every OOP langugage\. 

>We are come to very important part. I didn't want to explain classical entities but after that \.
 I will explain how to inject JWT to our project.

### JWT implementation 

1. Adding  Spring Security and JWT  dependencies to pom.xml 
    
    ```
         <dependency>
		 	<groupId>org.springframework.security</groupId>
		 	<artifactId>spring-security-test</artifactId>
	  		<scope>test</scope>
	  	</dependency>
        <dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt</artifactId>
			<version>0.9.1</version>
		</dependency>

   ```  
2. Creating WebSerucityConfig.java\
    ***WebSerucityConfig.java***
   ```
        import com.world.TodoBackend.security.jwt.AuthEntryPointJwt;
        import com.world.TodoBackend.security.jwt.AuthTokenFilter;
        import com.world.TodoBackend.security.services.UserDetailsServiceImpl;

        @Configuration
        @EnableWebSecurity
        @EnableGlobalMethodSecurity(
                // securedEnabled = true,
                // jsr250Enabled = true,
                prePostEnabled = true)
        public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
            @Autowired
            UserDetailsServiceImpl userDetailsService;

            @Autowired
            private AuthEntryPointJwt unauthorizedHandler;

            @Bean
            public AuthTokenFilter authenticationJwtTokenFilter() {
                return new AuthTokenFilter();
            }

            @Override
            public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
                authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
            }

            @Bean
            @Override
            public AuthenticationManager authenticationManagerBean() throws Exception {
                return super.authenticationManagerBean();
            }

            // Password Encoding here
            @Bean
            public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
            }
            
			// This function ovveride from Adapter and helps us for 
			//filter url and  check JWT authentication token is valid or invalid ? 
            @Override
            protected void configure(HttpSecurity http) throws Exception {
                http.cors().and().csrf().disable()
                    .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                    .authorizeRequests().antMatchers("/api/auth/**").permitAll()
                    .antMatchers("/api/test/**").permitAll()
                    .anyRequest().authenticated();

                http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
            }
        }
   ```

>This file is very important for enable to  Spring Security. As you can see \
 WebSecurityConfig class extends WebSecurityConfigurerAdapter this class comes from  Spring security protected void configure function helps us for setting CORS policy__
   
>I'm firstly declareted  **AuthenticationEntryPoint** because this is will start  JWT initialization and  we should declare ***session management***  with session manager we are able to manage users sessio tokens  are expired or not ?  if user session  expired then we are asking for Authorization requesit with ***.authorizeRequests*** if everything is fine then we are  sending a ***Response message***. Depends on this response we are routing user in frontend side. Last thing that we should add for perfectly use **JWT**. We are need to filter all Http Requests like post, put ,read and delete  at this moment **http.addFilterBefore** method helps us for inject our Authentication JWT token filter.

### AuthEntryPointJwt.java

```*
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

	private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		logger.error("Unauthorized error: {}", authException.getMessage());
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
	}

}
```

> Simply this class  helps us filter all request with Servlet containers if a request haven't Authorization token or token is expired then throws Cors Policy exception error.

### AuthTokenFilter.java

```*
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.world.TodoBackend.security.services.UserDetailsServiceImpl;

public class AuthTokenFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwt = parseJwt(request);
			if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
				String username = jwtUtils.getUserNameFromJwtToken(jwt);

				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (Exception e) {
			logger.error("Cannot set user authentication: {}", e);
		}

		filterChain.doFilter(request, response);
	}

	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");

		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7, headerAuth.length());
		}

		return null;
	}
}
```

> If user passed from AuthEntryPointJwt functions then we are filtering user token with using JWT parser.

### JwtUtils.java

```*
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.world.TodoBackend.security.services.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${world.app.jwtSecret}")
	private String jwtSecret;

	@Value("${world.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	public String generateJwtToken(Authentication authentication) {

		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		return Jwts.builder().setSubject((userPrincipal.getUsername())).setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}

		return false;
	}
}
```
> This class  prepared for use in AuthTokenFilter.

**UserDetailsImpl.java** and **UserDetailsServiceImpl.java** files simply using  User model for JWT credentials. I believe anyone can understand if look at those java classes.