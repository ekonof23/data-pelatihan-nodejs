-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Feb 2024 pada 01.28
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data-pelatihan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelatihan`
--

CREATE TABLE `pelatihan` (
  `id` int(11) NOT NULL,
  `judul_pelatihan` varchar(20) NOT NULL,
  `tanggal_pelatihan` date NOT NULL,
  `tempat_pelatihan` varchar(20) NOT NULL,
  `trainers` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pelatihan`
--

INSERT INTO `pelatihan` (`id`, `judul_pelatihan`, `tanggal_pelatihan`, `tempat_pelatihan`, `trainers`) VALUES
(1, 'tes 1', '2023-11-14', 'Magelang', 'Mita'),
(4, 'tes2', '2024-02-02', 'Magelang', 'Eko'),
(5, 'tes 3', '2024-02-20', 'Semarang', 'Eko'),
(6, 'tes 4', '2024-02-29', 'Jogja', 'Adi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `perusahaan`
--

CREATE TABLE `perusahaan` (
  `id` int(11) NOT NULL,
  `id_perusahaan` int(11) NOT NULL,
  `id_pelatihan` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `no_telpon` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `perusahaan`
--

INSERT INTO `perusahaan` (`id`, `id_perusahaan`, `id_pelatihan`, `nama`, `alamat`, `no_telpon`) VALUES
(1, 2, 2, 'PT MEI', 'aa', '0857333332'),
(2, 2, 2, 'PT PLN', 'wwwwwwwww', '7777777777'),
(3, 3, 5, 'PT BATU', 'ffffffffff', '555555555555555'),
(4, 4, 6, 'PT PDAM', 'ggggggggggggggg', '777777777777');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peserta`
--

CREATE TABLE `peserta` (
  `id` int(11) NOT NULL,
  `id_perusahaan` int(11) NOT NULL,
  `id_pelatihan` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `gender` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peserta`
--

INSERT INTO `peserta` (`id`, `id_perusahaan`, `id_pelatihan`, `nama`, `tanggal_lahir`, `gender`) VALUES
(3, 2, 1, 'adi', '2013-12-11', 'male'),
(4, 1, 4, 'Ade', '2013-12-12', 'Male'),
(5, 1, 1, 'Edi', '2014-12-10', 'male'),
(6, 3, 5, 'Eka', '2015-02-11', 'Female'),
(7, 4, 6, 'Andri', '2015-02-11', 'Male');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `pelatihan`
--
ALTER TABLE `pelatihan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `perusahaan`
--
ALTER TABLE `perusahaan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `peserta`
--
ALTER TABLE `peserta`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `pelatihan`
--
ALTER TABLE `pelatihan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `perusahaan`
--
ALTER TABLE `perusahaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `peserta`
--
ALTER TABLE `peserta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
