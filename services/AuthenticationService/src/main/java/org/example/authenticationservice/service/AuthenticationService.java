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
import org.example.authenticationservice.dto.request.LogoutRequest;
import org.example.authenticationservice.dto.request.RefreshTokenRequest;
import org.example.authenticationservice.dto.response.AuthenticationResponse;
import org.example.authenticationservice.dto.response.IntrospectResponse;
import org.example.authenticationservice.entity.InvalidateToken;
import org.example.authenticationservice.entity.User;
import org.example.authenticationservice.exception.AppException;
import org.example.authenticationservice.exception.ErrorCode;
import org.example.authenticationservice.repository.InvalidateTokenRepository;
import org.example.authenticationservice.repository.UserRepository;
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
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    InvalidateTokenRepository invalidateTokenRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String KEY_SIGN;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = userRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));


        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (authenticated) {
            var token = generateToken(user);

            return AuthenticationResponse.builder()
                    .authenticated(authenticated)
                    .token(token)
                    .build();
        } else {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();

        boolean isValid = true;
        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();

    }

    //đăng xuất
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken(), true);

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidateToken invalidateToken = InvalidateToken.builder()
                    .id(jit)
                    .expiryTime(expiryTime)
                    .build();

            invalidateTokenRepository.save(invalidateToken);

        } catch (AppException e) {
            log.info("Token already expired");
        }


    }

    //đối với đăng nhập bằng số điện thaotj thì username = phoneNumber còn Email thì tương tự
    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getId())//lấy Id người dung
                .issuer("Nguyen Son hoang")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .claim("scope", buildScope(user))
                .jwtID(UUID.randomUUID().toString())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(KEY_SIGN.getBytes()));
            return jwsObject.serialize();
        } catch (Exception e) {
            log.error("cannot create Token");
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    //refresh token
    public AuthenticationResponse refreshToken(RefreshTokenRequest request) throws ParseException, JOSEException {
        var signJWT = verifyToken(request.getToken(), true);

        var jit = signJWT.getJWTClaimsSet().getJWTID();

        var expiryTime = signJWT.getJWTClaimsSet().getExpirationTime();
        InvalidateToken invalidateToken = InvalidateToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();

        invalidateTokenRepository.save(invalidateToken);

        var userId = signJWT.getJWTClaimsSet().getSubject();

        var user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .authenticated(true)
                .token(token)
                .build();

    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {

        JWSVerifier verifier = new MACVerifier(KEY_SIGN.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT
                .getJWTClaimsSet()
                .getIssueTime()
                .toInstant()
                .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS)
                .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date()))) throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidateTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(stringJoiner::add);

        }
        return stringJoiner.toString();
    }
}
