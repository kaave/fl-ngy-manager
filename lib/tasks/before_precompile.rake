task :frontend_install do
  sh 'npm i'
  sh 'npm run typings -- i'
end

task :frontend_build do
  sh 'npm run build'
end

Rake::Task['assets:precompile'].enhance(%i(frontend_install frontend_build))
