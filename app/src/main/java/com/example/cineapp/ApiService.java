package com.example.cineapp;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ApiService {
    @POST("auth/login")
    Call<Void> login(@Body LoginRequest loginRequest);

    @GET("movies")
    Call<List<Movie>> getMovies();
}

// Clase para el Login (email y password como vimos en la API)
class LoginRequest {
    String email;
    String password;
    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}