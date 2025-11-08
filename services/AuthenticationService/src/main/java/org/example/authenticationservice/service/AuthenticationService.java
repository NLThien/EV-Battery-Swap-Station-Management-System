package org.example.authenticationservice.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.example.authenticationservice.dto.request.AuthenticationRequest;
import org.example.authenticationservice.dto.request.IntrospectRequest;
import org.example.authenticationservice.dto.response.AuthenticationResponse;
import org.example.authenticationservice.dto.response.IntrospectResponse;
import org.example.authenticationservice.dto.response.UserResponse;
import org.example.authenticationservice.entity.User;
import org.example.authenticationservice.exception.AppException;
import org.example.authenticationservice.exception.ErrorCode;
import org.example.authenticationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String KEY_SIGN;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = userRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));


         boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

         if(authenticated) {
             var token = generateToken(user);

             return AuthenticationResponse.builder()
                     .authenticated(authenticated)
                     .token(token)
                     .build();
         } else {
             throw new AppException(ErrorCode.UNAUTHENTICATED);
         }
    }

    //đối với đăng nhập bằng số điện thaotj thì username = phoneNumber còn Email thì tương tự
    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getPhoneNumber())
                .issuer("Nguyen Son hoang")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("scope",buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header,payload);

        try {
            jwsObject.sign(new MACSigner(KEY_SIGN.getBytes()));
            return jwsObject.serialize();
        }
        catch (Exception e) {
            log.error("cannot create Token");
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();

        JWSVerifier verifier = new MACVerifier(KEY_SIGN.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expityTime = signedJWT.getJWTClaimsSet().getExpirationTime();

       var verified= signedJWT.verify(verifier);

       return IntrospectResponse.builder()
               .valid(verified && expityTime.after(new Date()))
               .build();

    }
    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles())){
         user.getRoles().forEach(stringJoiner::add);

        }
        return stringJoiner.toString();
    }
}
