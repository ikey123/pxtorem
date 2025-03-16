import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pngToIco from 'png-to-ico';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconSizes = {
  'favicon.ico': 32,
  'icons/icon-192.png': 192,
  'icons/icon-512.png': 512,
  'icons/apple-icon.png': 180,
  'icons/icon-16.png': 16,
  'icons/icon-32.png': 32,
  'icons/icon-48.png': 48,
  'icons/icon-64.png': 64,
  'icons/icon-96.png': 96,
  'icons/icon-128.png': 128,
  'icons/icon-256.png': 256
};

async function generateIcons() {
  try {
    // Create icons directory if it doesn't exist
    await fs.mkdir(path.join(__dirname, '../public/icons'), { recursive: true });

    const svgBuffer = await fs.readFile(path.join(__dirname, '../public/icons/icon.svg'));

    for (const [filename, size] of Object.entries(iconSizes)) {
      const outputPath = path.join(__dirname, '../public', filename);
      
      if (filename.endsWith('.ico')) {
        // 对于favicon.ico，先创建PNG然后转换为ICO
        const tempPngPath = path.join(__dirname, '../public/temp-favicon.png');
        
        // 生成临时PNG文件
        await sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toFile(tempPngPath);
        
        // 将PNG转换为ICO
        const pngBuffer = await fs.readFile(tempPngPath);
        const icoBuffer = await pngToIco([pngBuffer]);
        
        // 保存ICO文件
        await fs.writeFile(outputPath, icoBuffer);
        
        // 删除临时PNG文件
        await fs.unlink(tempPngPath);
        
        console.log(`Generated: ${filename} (${size}x${size})`);
      } else {
        await sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toFile(outputPath);
        
        console.log(`Generated: ${filename} (${size}x${size})`);
      }
    }
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();