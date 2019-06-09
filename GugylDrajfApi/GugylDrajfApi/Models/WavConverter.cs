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
            var stream = new RawSourceWaveStream(
                         new MemoryStream(rawAudio), new WaveFormat(16000, 2));

            var mono = new StereoToMonoProvider16(stream);
            mono.LeftVolume = 0.0f;
            mono.RightVolume = 1.0f;

            byte[] buffer = new byte[stream.Length];

            int reader = 0;
            MemoryStream memoryStream = new MemoryStream();
            //while ((reader = mono.Read(buffer, 0, buffer.Length)) != 0)
            //    memoryStream.Write(buffer, 0, reader);

            WaveFileWriter.WriteWavFileToStream(memoryStream, mono);
            return memoryStream.ToArray();
        }
    }
}
