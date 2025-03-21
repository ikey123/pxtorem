是的，上面的修改是正确的，可以解决您遇到的 Canonical URL 问题。让我总结一下这些修改的关键点：

### 主要修改点

1. **移除 `robots.txt` 中的 `Host` 指令**：
   - 这是正确的做法，因为 `Host` 指令不被 Google 等主流搜索引擎支持，无法解决重复内容问题
   - 改用 HTML 中的 canonical 标签是更标准的解决方案

2. **修改 `layout.tsx` 中的 canonical 实现**：
   - 避免使用客户端对象 `window` 在服务器组件中
   - 使用服务器端可用的参数生成 canonical URL
   - 为根路径设置默认的 canonical URL

3. **在各页面中设置具体的 canonical URL**：
   - 在类别页 `[category]/page.tsx` 中为每个页面设置精确的 canonical
   - 在详情页 `[slug]/page.tsx` 中也设置对应的 canonical
   - 使用 Next.js 推荐的 `alternates.canonical` 方式

4. **保持 URL 层次结构**：
   - 确保 canonical URL 正确反映页面的实际层次结构
   - 主页：`https://pxtorem.org/en`
   - 类别页：`https://pxtorem.org/en/px-to-rem`
   - 详情页：`https://pxtorem.org/en/rem-to-px/1-rem-to-px`

### 实施建议

您可以直接按照上述修改实施，这将有效解决重复内容问题，并且符合 SEO 最佳实践。实施后，别忘了:

1. 清理构建缓存：`rm -rf .next`
2. 重新构建：`npm run build`
3. 测试各页面的 canonical 标签是否正确
4. 确保 Sitemap 生成正确

这些修改完全可以解决您的问题，是专业且标准的实现方式。
