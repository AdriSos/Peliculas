package com.example.cineapp

import android.R
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MoviesActivity : AppCompatActivity() {
    var rvMovies: RecyclerView? = null
    var adapter: MovieAdapter? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_movies)

        rvMovies = findViewById<RecyclerView?>(R.id.rvMovies)
        rvMovies!!.setLayoutManager(LinearLayoutManager(this))

        // CONFIGURACIÓN DE LA API (Usa la IP de tu compañero)
        val retrofit = Retrofit.Builder()
            .baseUrl("http://TU_IP_AQUI:3000/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val api = retrofit.create<ApiService?>(ApiService::class.java)

        api.getMovies().enqueue(object : Callback<MutableList<Movie?>?> {
            override fun onResponse(
                call: Call<MutableList<Movie?>?>,
                response: Response<MutableList<Movie?>?>
            ) {
                if (response.isSuccessful() && response.body() != null) {
                    adapter = MovieAdapter(response.body())
                    rvMovies!!.setAdapter(adapter)
                }
            }

            override fun onFailure(call: Call<MutableList<Movie?>?>, t: Throwable) {
                Toast.makeText(this@MoviesActivity, "Error al cargar API", Toast.LENGTH_SHORT)
                    .show()
            }
        })
    }
}