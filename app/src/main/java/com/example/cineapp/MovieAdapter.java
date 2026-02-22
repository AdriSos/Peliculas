package com.example.cineapp;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import java.util.List;

public class MovieAdapter extends RecyclerView.Adapter<MovieAdapter.MovieViewHolder> {
    private List<Movie> movies;

    public MovieAdapter(List<Movie> movies) { this.movies = movies; }

    @NonNull
    @Override
    public MovieViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_pelicula, parent, false);
        return new MovieViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull MovieViewHolder holder, int position) {
        Movie movie = movies.get(position);
        holder.tvTitulo.setText(movie.getTitle());
        holder.tvDesc.setText(movie.getDescription());

        // Carga la imagen neón desde la URL de la API
        Glide.with(holder.itemView.getContext()).load(movie.getPoster()).into(holder.ivPoster);
    }

    @Override
    public int getItemCount() { return movies.size(); }

    public static class MovieViewHolder extends RecyclerView.ViewHolder {
        TextView tvTitulo, tvDesc;
        ImageView ivPoster;
        public MovieViewHolder(View itemView) {
            super(itemView);
            tvTitulo = itemView.findViewById(R.id.tvPeliculaTitulo);
            tvDesc = itemView.findViewById(R.id.tvDescripcion);
            ivPoster = itemView.findViewById(R.id.ivPoster);
        }
    }
}