using NAudio.Wave;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Models
{
    public static class WavConverter
    {
        public static byte[] ConvertToAzureWav(byte[] rawAudio)
        {
            MemoryStream outStream = new MemoryStream();
            using (var waveFileReader = new RawSourceWaveStream(new MemoryStream(rawAudio), new WaveFormat()))
            {
                var outFormat = new WaveFormat(16000, 1);
                using (var resampler = new MediaFoundationResampler(waveFileReader, outFormat))
                {
                    WaveFileWriter.WriteWavFileToStream(outStream, resampler);
                }
            }

            return outStream.ToArray();
        }
    }
}
