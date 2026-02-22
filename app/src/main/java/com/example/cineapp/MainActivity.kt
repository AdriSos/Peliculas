package com.example.cineapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPass = findViewById<EditText>(R.id.etPassword)
        val btn = findViewById<Button>(R.id.btnIngresar)


        val rf = Retrofit.Builder()
            .baseUrl("http://TU_IP_AQUI:3000/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val api = rf.create(ApiService::class.java)

        btn.setOnClickListener {
            val email = etEmail.text.toString()
            val password = etPass.text.toString()

            api.login(LoginRequest(email, password)).enqueue(object : Callback<Void> {
                override fun onResponse(c: Call<Void>, r: Response<Void>) {
                    if (r.isSuccessful) {
                        val intent = Intent(this@MainActivity, MoviesActivity::class.java)
                        startActivity(intent)
                    } else {
                        Toast.makeText(this@MainActivity, "Error: Credenciales inválidas", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(c: Call<Void>, t: Throwable) {
                    Toast.makeText(this@MainActivity, "Fallo Red: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}