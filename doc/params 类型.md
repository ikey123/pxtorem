其他可能需要检查的文件
您可能需要检查项目中所有使用动态路由参数的页面组件，确保它们的 params 类型定义都是 Promise<{ locale: string }> 而不是简单的 { locale: string }。
以下是一个检查列表：
app/[locale]/page.tsx（主页）
app/[locale]/[category]/page.tsx（类别页）
app/[locale]/[category]/[slug]/page.tsx（详情页）
任何其他使用动态路由参数的页面组件
全局修复方案
如果您有很多页面需要修复，可以考虑创建一个类型定义文件（例如 src/types/index.ts），定义通用的页面 props 类型：
然后在页面组件中导入和使用这些类型：
构建和测试